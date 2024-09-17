import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { BullModule } from '@nestjs/bullmq';
import { AudioController } from './audio.controller';
import { AudioConsumer } from './audio.consumer';
import { AUDIO_QUEUE } from './constants';

@Module({
  imports: [
    // Register queue audio
    BullModule.registerQueue({
      name: AUDIO_QUEUE,
    }),
  ],
  providers: [AudioService, AudioConsumer],
  controllers: [AudioController],
})
export class AudioModule {}
