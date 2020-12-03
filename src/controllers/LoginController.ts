import { Request, Response } from 'express';
import { get, controller, post, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {
	// PropertyDescriptor shown an error because mismatch types
	//
	// @get('/')
	// add(a: number, b: number): number {
	// 	return a + b;
	// }

	@get('/login')
	getLogin(req: Request, res: Response): void {
		res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
	}

	@post('/login')
	@bodyValidator('email', 'password')
	postLogin(req: Request, res: Response) {
		const { email, password } = req.body;

		if (email && password && email === 'hi@hi.com' && password === 'pass') {
			req.session = { loggedIn: true };
			res.redirect('/');
		} else {
			res.send('You must provide your credentials');
		}
	}

	@get('/logout')
	getLogout(req: Request, res: Response) {
		req.session = null;
		res.redirect('/');
	}
}
