import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateJobDto } from './dto/create-job.dto';
import type { UpdateJobDto } from './dto/update-job.dto';

export type JobStatus = 'open' | 'paused' | 'closed';

export interface JobRecord {
  id: string;
  title: string;
  department: string;
  location: string;
  level: string;
  applicants: number;
  status: JobStatus;
  updatedAt: string;
}

@Injectable()
export class JobsService {
  private jobs: JobRecord[] = [
    {
      id: 'job_1',
      title: 'Kỹ sư kết cấu',
      department: 'Engineering',
      location: 'TP. HCM',
      level: 'Senior',
      applicants: 34,
      status: 'open',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'job_2',
      title: 'BIM Coordinator',
      department: 'Architecture',
      location: 'Đà Nẵng',
      level: 'Middle',
      applicants: 17,
      status: 'open',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'job_3',
      title: 'QS Intern',
      department: 'Cost Control',
      location: 'Cần Thơ',
      level: 'Intern',
      applicants: 21,
      status: 'paused',
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): JobRecord[] {
    return this.jobs;
  }

  findOne(id: string): JobRecord {
    const job = this.jobs.find((item) => item.id === id);
    if (!job) {
      throw new NotFoundException(`Job ${id} not found`);
    }
    return job;
  }

  getStats() {
    const total = this.jobs.length;
    const open = this.jobs.filter((item) => item.status === 'open').length;
    const paused = this.jobs.filter((item) => item.status === 'paused').length;
    const closed = this.jobs.filter((item) => item.status === 'closed').length;
    const applicants = this.jobs.reduce((acc, item) => acc + item.applicants, 0);

    return {
      total,
      open,
      paused,
      closed,
      applicants,
    };
  }

  create(dto: CreateJobDto): JobRecord {
    const created: JobRecord = {
      id: randomUUID(),
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.jobs = [created, ...this.jobs];
    return created;
  }

  update(id: string, dto: UpdateJobDto): JobRecord {
    const existing = this.findOne(id);
    const updated: JobRecord = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.jobs = this.jobs.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: string): { deleted: boolean } {
    this.findOne(id);
    this.jobs = this.jobs.filter((item) => item.id !== id);
    return { deleted: true };
  }
}
