import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AUDIO_QUEUE } from './constants';

// Thêm decorator @Processor để khai báo consumer cho audio queue
@Processor(AUDIO_QUEUE)
export class AudioConsumer extends WorkerHost {
  private readonly logger = new Logger(AudioConsumer.name);

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case 'transcode':
        this.transcode(job.data);
        break;
      default:
        break;
    }
  }

  transcode(data: any) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(data);
    this.logger.debug('Transcoding completed');
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
