import { Module } from '@nestjs/common'

import { SharedModule } from '@nx-blog/server/modules/shared'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AdminController } from './admin.controller'

@Module({
  imports: [SharedModule],
  controllers: [UserController, AdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
