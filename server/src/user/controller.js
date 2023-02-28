import userService from './service.js';

class UserController {
  async create(req, res, next) {
    try {
      return res
        .status(201)
        .json(await userService.create(req.body, req.files));
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      return res.json(await userService.login(req.body));
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      return res.json(await userService.update(req.body, req.files));
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      return res.json(await userService.getAll());
    } catch (e) {
      next(e);
    }
  }

  async getAvatar(req, res, next) {
    try {
      const stream = await userService.getAvatar(req.params.avatar);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
