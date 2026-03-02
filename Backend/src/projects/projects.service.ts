import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateProjectDto } from './dto/create-project.dto';
import type { UpdateProjectDto } from './dto/update-project.dto';

export type ProjectStatus = 'active' | 'pending' | 'closed';

export interface ProjectRecord {
  id: string;
  name: string;
  type: string;
  region: string;
  progress: number;
  status: ProjectStatus;
  budget: number;
  updatedAt: string;
}

@Injectable()
export class ProjectsService {
  private projects: ProjectRecord[] = [
    {
      id: 'prj_1',
      name: 'Villa Riverside',
      type: 'Residential',
      region: 'TP. Hồ Chí Minh',
      progress: 68,
      status: 'active',
      budget: 1200000000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_2',
      name: 'AHP Office Tower',
      type: 'Commercial',
      region: 'Đà Nẵng',
      progress: 42,
      status: 'active',
      budget: 3100000000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_3',
      name: 'Resort Garden Phase 2',
      type: 'Hospitality',
      region: 'Phú Quốc',
      progress: 100,
      status: 'closed',
      budget: 5500000000,
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): ProjectRecord[] {
    return this.projects;
  }

  findOne(id: string): ProjectRecord {
    const project = this.projects.find((item) => item.id === id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return project;
  }

  getStats() {
    const total = this.projects.length;
    const active = this.projects.filter((item) => item.status === 'active').length;
    const pending = this.projects.filter((item) => item.status === 'pending').length;
    const closed = this.projects.filter((item) => item.status === 'closed').length;

    const avgProgress =
      total === 0
        ? 0
        : Math.round(this.projects.reduce((acc, item) => acc + item.progress, 0) / total);

    return {
      total,
      active,
      pending,
      closed,
      avgProgress,
    };
  }

  create(dto: CreateProjectDto): ProjectRecord {
    const created: ProjectRecord = {
      id: randomUUID(),
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.projects = [created, ...this.projects];
    return created;
  }

  update(id: string, dto: UpdateProjectDto): ProjectRecord {
    const existing = this.findOne(id);
    const updated: ProjectRecord = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    this.projects = this.projects.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: string): { deleted: boolean } {
    this.findOne(id);
    this.projects = this.projects.filter((item) => item.id !== id);
    return { deleted: true };
  }
}
