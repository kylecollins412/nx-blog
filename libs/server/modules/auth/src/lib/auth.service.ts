import { Response } from 'express'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UserService } from '@nx-blog/server/modules/user'
import { getHash } from '@nx-blog/server/utils'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userService.findByEmail(username)

    if (user && user.password === getHash(password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user

      return result
    }
  }

  login(user: string | object | Buffer) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }

  setToken(res: Response, token: string): void {
    res.cookie('auth_token', token, {
      path: '/',
      httpOnly: true,
    })
  }

  resetPassword(username: string, oldPassword: string, newPassword: string) {
    return this.userService.resetPassword(username, oldPassword, newPassword)
  }
}
