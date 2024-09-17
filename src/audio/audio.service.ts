import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { AUDIO_QUEUE } from './constants';

@Injectable()
export class AudioService {
  constructor(@InjectQueue(AUDIO_QUEUE) private audioQueue: Queue) {}

  async transcode() {
    // Thêm một job tới queue
    await this.audioQueue.add('transcode', {
      foo: 'bar',
    });
  }
}
