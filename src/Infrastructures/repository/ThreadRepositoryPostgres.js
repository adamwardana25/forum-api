/* eslint-disable no-underscore-dangle */
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const RegisteredThread = require('../../Domains/threads/entities/RegisteredThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(registerThread) {
    const { title, body, owner } = registerThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new RegisteredThread(result.rows[0]);
  }

  async verifyAvailableThread(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }

  async getThreadById(threadId) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
      FROM threads
      JOIN users
      ON threads.owner = users.id
      WHERE threads.id = $1`,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    
    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    const thread = result.rows[0];
    return thread;
  }
}

module.exports = ThreadRepositoryPostgres;
