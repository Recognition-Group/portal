import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { RightsHolderApplicationModule } from './rightsHolder/application'

import { AdminApplicationModule } from './admin/application'

import { TrackApplicationModule } from './track/application'

import { ReleaseApplicationModule } from './release/application'

import { ReleaseTrackApplicationModule } from './releaseTrack/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    RightsHolderApplicationModule,

    AdminApplicationModule,

    TrackApplicationModule,

    ReleaseApplicationModule,

    ReleaseTrackApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
