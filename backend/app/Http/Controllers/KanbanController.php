<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Card;
use App\Models\Member;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KanbanController extends Controller
{
    public function index(): JsonResponse
    {
        $boards = Board::with([
            'members',
            'tags',
            'lists.cards.tags',
            'lists.cards.member',
        ])->get();

        return response()->json($boards);
    }

    public function storeBoard(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $board = Board::create($validated);

        $board->lists()->createMany([
            ['name' => 'To Do'],
            ['name' => 'Doing'],
            ['name' => 'Done'],
        ]);

        return response()->json($board->load(['lists', 'members', 'tags']), 201);
    }

    public function storeList(Request $request, Board $board): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $list = $board->lists()->create($validated);

        return response()->json($list, 201);
    }

    public function storeMember(Request $request, Board $board): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
        ]);

        $member = $board->members()->create($validated);

        return response()->json($member, 201);
    }

    public function storeCard(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'board_list_id' => ['required', 'exists:board_lists,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'member_id' => ['nullable', 'exists:members,id'],
            'due_date' => ['nullable', 'date'],
            'position' => ['nullable', 'integer', 'min:0'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
        ]);

        $card = Card::create([
            'board_list_id' => $validated['board_list_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'member_id' => $validated['member_id'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'position' => $validated['position'] ?? 0,
        ]);

        if (!empty($validated['tags'])) {
            $this->syncCardTags($card, $validated['tags']);
        }

        return response()->json($card->load(['tags', 'member']), 201);
    }

    public function updateCard(Request $request, Card $card): JsonResponse
    {
        $validated = $request->validate([
            'board_list_id' => ['nullable', 'exists:board_lists,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'member_id' => ['nullable', 'exists:members,id'],
            'due_date' => ['nullable', 'date'],
            'position' => ['nullable', 'integer', 'min:0'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
        ]);

        $card->update($validated);

        if (array_key_exists('tags', $validated)) {
            $this->syncCardTags($card, $validated['tags'] ?? []);
        }

        return response()->json($card->load(['tags', 'member']));
    }

    protected function syncCardTags(Card $card, array $tagNames): void
    {
        $boardId = $card->list->board_id;

        $tagIds = collect($tagNames)
            ->map(fn (string $name) => trim(strtolower($name)))
            ->filter()
            ->unique()
            ->map(function (string $name) use ($boardId) {
                $tag = Tag::firstOrCreate(
                    ['board_id' => $boardId, 'name' => $name],
                    ['color' => '#3b82f6']
                );

                return $tag->id;
            })
            ->values();

        $card->tags()->sync($tagIds);
    }
}
