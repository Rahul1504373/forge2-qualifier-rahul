import { useMemo, useState } from 'react'
import './App.css'

const makeId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random())

const seedBoard = {
  id: 'board-1',
  name: 'Forge Qualifier Sprint',
  members: [
    { id: 'member-1', name: 'Priya' },
    { id: 'member-2', name: 'Aarav' },
  ],
  lists: [
    { id: 'list-1', name: 'To Do' },
    { id: 'list-2', name: 'Doing' },
    { id: 'list-3', name: 'Done' },
  ],
  cards: [
    {
      id: 'card-1',
      listId: 'list-1',
      title: 'Set up Slack channel loop',
      description: 'Connect #sprint-main, #agent-coder, #agent-log and verify round-trip.',
      tags: ['ops'],
      memberId: 'member-1',
      dueDate: '',
    },
    {
      id: 'card-2',
      listId: 'list-2',
      title: 'Build Kanban CRUD',
      description: 'Add board/list/card workflows with assignment and labels.',
      tags: ['build', 'frontend'],
      memberId: 'member-2',
      dueDate: '',
    },
  ],
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const normalizeBoard = (board) => ({
  id: String(board.id),
  name: board.name,
  members: (board.members || []).map((member) => ({
    id: String(member.id),
    name: member.name,
  })),
  lists: (board.lists || []).map((list) => ({
    id: String(list.id),
    name: list.name,
  })),
  cards: (board.lists || []).flatMap((list) =>
    (list.cards || []).map((card) => ({
      id: String(card.id),
      listId: String(list.id),
      title: card.title,
      description: card.description || '',
      tags: (card.tags || []).map((tag) => tag.name),
      memberId: card.member_id ? String(card.member_id) : '',
      dueDate: card.due_date || '',
    })),
  ),
})

const parseCardPayload = (card) => ({
  title: card.title,
  description: card.description,
  board_list_id: Number(card.listId),
  member_id: card.memberId ? Number(card.memberId) : null,
  due_date: card.dueDate || null,
  tags: card.tags,
})

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

function App() {
  const [boards, setBoards] = useState([seedBoard])
  const [activeBoardId, setActiveBoardId] = useState(seedBoard.id)
  const [newBoardName, setNewBoardName] = useState('')
  const [newMemberName, setNewMemberName] = useState('')
  const [newListName, setNewListName] = useState('')
  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardDescription, setNewCardDescription] = useState('')
  const [newCardTags, setNewCardTags] = useState('')
  const [newCardListId, setNewCardListId] = useState(seedBoard.lists[0].id)
  const [editingCardId, setEditingCardId] = useState(null)
  const [apiError, setApiError] = useState('')
  const isApiMode = Boolean(apiBaseUrl)

  const loadBoards = async () => {
    if (!isApiMode) {
      return
    }

    try {
      const data = await request('/boards')
      if (!Array.isArray(data) || data.length === 0) {
        return
      }

      const normalized = data.map(normalizeBoard)
      setBoards(normalized)
      setActiveBoardId((current) => current || normalized[0].id)
      setNewCardListId(normalized[0].lists[0]?.id || '')
      setApiError('')
    } catch {
      setApiError('API unavailable, using local mode.')
    }
  }

  const activeBoard = useMemo(
    () => boards.find((board) => board.id === activeBoardId),
    [activeBoardId, boards],
  )

  const updateActiveBoard = (updater) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === activeBoardId ? updater(board) : board,
      ),
    )
  }

  const createBoard = async (event) => {
    event.preventDefault()
    const trimmed = newBoardName.trim()
    if (!trimmed) {
      return
    }

    if (isApiMode) {
      try {
        const board = await request('/boards', {
          method: 'POST',
          body: JSON.stringify({ name: trimmed }),
        })
        await loadBoards()
        setActiveBoardId(String(board.id))
        setNewBoardName('')
        return
      } catch {
        setApiError('Board creation failed via API.')
      }
    }

    const board = {
      id: makeId(),
      name: trimmed,
      members: [],
      lists: [
        { id: makeId(), name: 'To Do' },
        { id: makeId(), name: 'Doing' },
        { id: makeId(), name: 'Done' },
      ],
      cards: [],
    }
    setBoards((prevBoards) => [...prevBoards, board])
    setActiveBoardId(board.id)
    setNewBoardName('')
  }

  const addMember = async (event) => {
    event.preventDefault()
    const trimmed = newMemberName.trim()
    if (!trimmed || !activeBoard) {
      return
    }

    if (isApiMode) {
      try {
        await request(`/boards/${activeBoard.id}/members`, {
          method: 'POST',
          body: JSON.stringify({ name: trimmed }),
        })
        await loadBoards()
        setNewMemberName('')
        return
      } catch {
        setApiError('Member creation failed via API.')
      }
    }

    updateActiveBoard((board) => ({
      ...board,
      members: [...board.members, { id: makeId(), name: trimmed }],
    }))
    setNewMemberName('')
  }

  const addList = async (event) => {
    event.preventDefault()
    const trimmed = newListName.trim()
    if (!trimmed || !activeBoard) {
      return
    }

    if (isApiMode) {
      try {
        const list = await request(`/boards/${activeBoard.id}/lists`, {
          method: 'POST',
          body: JSON.stringify({ name: trimmed }),
        })
        await loadBoards()
        setNewListName('')
        if (!newCardListId) {
          setNewCardListId(String(list.id))
        }
        return
      } catch {
        setApiError('List creation failed via API.')
      }
    }

    const list = { id: makeId(), name: trimmed }
    updateActiveBoard((board) => ({ ...board, lists: [...board.lists, list] }))
    setNewListName('')
    if (!newCardListId) {
      setNewCardListId(list.id)
    }
  }

  const addCard = async (event) => {
    event.preventDefault()
    if (!activeBoard) {
      return
    }
    const trimmedTitle = newCardTitle.trim()
    if (!trimmedTitle) {
      return
    }
    const parsedTags = newCardTags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
    const fallbackListId = activeBoard.lists[0]?.id
    const targetListId = newCardListId || fallbackListId
    if (!targetListId) {
      return
    }

    const nextCard = {
      id: makeId(),
      listId: targetListId,
      title: trimmedTitle,
      description: newCardDescription.trim(),
      tags: parsedTags,
      memberId: '',
      dueDate: '',
    }

    if (isApiMode) {
      try {
        await request('/cards', {
          method: 'POST',
          body: JSON.stringify(parseCardPayload(nextCard)),
        })
        await loadBoards()
        setNewCardTitle('')
        setNewCardDescription('')
        setNewCardTags('')
        return
      } catch {
        setApiError('Card creation failed via API.')
      }
    }

    updateActiveBoard((board) => ({
      ...board,
      cards: [
        ...board.cards,
        nextCard,
      ],
    }))
    setNewCardTitle('')
    setNewCardDescription('')
    setNewCardTags('')
  }

  const updateCard = async (cardId, updater) => {
    const existingCard = activeBoard.cards.find((card) => card.id === cardId)
    if (!existingCard) {
      return
    }
    const nextCard = updater(existingCard)

    if (isApiMode && /^\d+$/.test(String(cardId))) {
      try {
        await request(`/cards/${cardId}`, {
          method: 'PATCH',
          body: JSON.stringify(parseCardPayload(nextCard)),
        })
        await loadBoards()
        return
      } catch {
        setApiError('Card update failed via API.')
      }
    }

    updateActiveBoard((board) => ({
      ...board,
      cards: board.cards.map((card) => (card.id === cardId ? nextCard : card)),
    }))
  }

  const isOverdue = (card) => {
    if (!card.dueDate) {
      return false
    }
    const dueAt = new Date(card.dueDate)
    const today = new Date()
    dueAt.setHours(23, 59, 59, 999)
    today.setHours(0, 0, 0, 0)
    return dueAt < today
  }

  const memberNameById = (memberId) => {
    if (!activeBoard || !memberId) {
      return 'Unassigned'
    }
    return activeBoard.members.find((member) => member.id === memberId)?.name || 'Unassigned'
  }

  if (!activeBoard) {
    return <main className="app-shell">No board found.</main>
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="kicker">Forge 2 Qualifier</p>
          <h1>Tiny Kanban Board</h1>
          <p className="subtitle">Boards, lists, cards, labels, assignees, and due dates.</p>
          <p className="mode">Mode: {isApiMode ? 'Laravel API' : 'Local demo state'}</p>
          {apiError ? <p className="mode error">{apiError}</p> : null}
        </div>
        <form className="inline-form" onSubmit={createBoard}>
          <input
            type="text"
            value={newBoardName}
            onChange={(event) => setNewBoardName(event.target.value)}
            placeholder="New board name"
            aria-label="New board name"
          />
          <button type="submit">Create board</button>
          {isApiMode ? (
            <button type="button" className="ghost" onClick={loadBoards}>
              Sync API
            </button>
          ) : null}
        </form>
      </header>

      <section className="board-toolbar">
        <label>
          Active board
          <select
            value={activeBoardId}
            onChange={(event) => {
              setActiveBoardId(event.target.value)
              setEditingCardId(null)
            }}
          >
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </label>

        <form className="inline-form" onSubmit={addMember}>
          <input
            type="text"
            value={newMemberName}
            onChange={(event) => setNewMemberName(event.target.value)}
            placeholder="Add member"
            aria-label="Add member"
          />
          <button type="submit">Add member</button>
        </form>

        <form className="inline-form" onSubmit={addList}>
          <input
            type="text"
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
            placeholder="Add list"
            aria-label="Add list"
          />
          <button type="submit">Add list</button>
        </form>
      </section>

      <section className="composer">
        <h2>Create card</h2>
        <form className="composer-grid" onSubmit={addCard}>
          <label>
            Title
            <input
              type="text"
              value={newCardTitle}
              onChange={(event) => setNewCardTitle(event.target.value)}
              placeholder="Card title"
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={newCardDescription}
              onChange={(event) => setNewCardDescription(event.target.value)}
              placeholder="Card details"
              rows={2}
            />
          </label>
          <label>
            Tags (comma separated)
            <input
              type="text"
              value={newCardTags}
              onChange={(event) => setNewCardTags(event.target.value)}
              placeholder="bug, ui, api"
            />
          </label>
          <label>
            List
            <select
              value={newCardListId}
              onChange={(event) => setNewCardListId(event.target.value)}
            >
              {activeBoard.lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="primary">Add card</button>
        </form>
      </section>

      <section className="board-grid">
        {activeBoard.lists.map((list) => {
          const cards = activeBoard.cards.filter((card) => card.listId === list.id)
          return (
            <article key={list.id} className="list-column">
              <header>
                <h3>{list.name}</h3>
                <span>{cards.length} cards</span>
              </header>

              <div className="list-cards">
                {cards.map((card) => (
                  <div key={card.id} className={`card ${isOverdue(card) ? 'overdue' : ''}`}>
                    <h4>{card.title}</h4>
                    <p>{card.description || 'No description yet.'}</p>
                    <div className="tag-row">
                      {card.tags.length === 0 ? <span className="tag muted">no tags</span> : null}
                      {card.tags.map((tag) => (
                        <span key={`${card.id}-${tag}`} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="meta">Assignee: {memberNameById(card.memberId)}</p>
                    <p className="meta">
                      Due: {card.dueDate || 'none'} {isOverdue(card) ? '(overdue)' : ''}
                    </p>

                    <label>
                      Move to
                      <select
                        value={card.listId}
                        onChange={(event) =>
                          updateCard(card.id, (current) => ({
                            ...current,
                            listId: event.target.value,
                          }))
                        }
                      >
                        {activeBoard.lists.map((targetList) => (
                          <option key={targetList.id} value={targetList.id}>
                            {targetList.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="button"
                      className="ghost"
                      onClick={() =>
                        setEditingCardId((current) => (current === card.id ? null : card.id))
                      }
                    >
                      {editingCardId === card.id ? 'Close details' : 'Edit details'}
                    </button>

                    {editingCardId === card.id ? (
                      <div className="edit-panel">
                        <label>
                          Title
                          <input
                            type="text"
                            value={card.title}
                            onChange={(event) =>
                              updateCard(card.id, (current) => ({
                                ...current,
                                title: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Description
                          <textarea
                            rows={3}
                            value={card.description}
                            onChange={(event) =>
                              updateCard(card.id, (current) => ({
                                ...current,
                                description: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Tags
                          <input
                            type="text"
                            value={card.tags.join(', ')}
                            onChange={(event) =>
                              updateCard(card.id, (current) => ({
                                ...current,
                                tags: event.target.value
                                  .split(',')
                                  .map((tag) => tag.trim().toLowerCase())
                                  .filter(Boolean),
                              }))
                            }
                          />
                        </label>
                        <label>
                          Assignee
                          <select
                            value={card.memberId}
                            onChange={(event) =>
                              updateCard(card.id, (current) => ({
                                ...current,
                                memberId: event.target.value,
                              }))
                            }
                          >
                            <option value="">Unassigned</option>
                            {activeBoard.members.map((member) => (
                              <option key={member.id} value={member.id}>
                                {member.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Due date
                          <input
                            type="date"
                            value={card.dueDate}
                            onChange={(event) =>
                              updateCard(card.id, (current) => ({
                                ...current,
                                dueDate: event.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default App
