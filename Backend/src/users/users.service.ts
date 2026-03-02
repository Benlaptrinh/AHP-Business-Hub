import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { AuthUser } from '../common/roles';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

export type UserStatus = 'active' | 'suspended';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: UserStatus;
  phone: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  private users: UserRecord[] = [
    {
      id: 'usr_1',
      name: 'Nguyễn Hữu Việt',
      email: 'admin@anhongphat.vn',
      role: 'admin',
      status: 'active',
      phone: '0372474500',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'usr_2',
      name: 'Lê Hoàng Anh',
      email: 'user@gmail.com',
      role: 'user',
      status: 'active',
      phone: '0909000001',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'usr_3',
      name: 'Phạm Mai Lan',
      email: 'user02@gmail.com',
      role: 'user',
      status: 'suspended',
      phone: '0909000002',
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): UserRecord[] {
    return this.users;
  }

  getStats() {
    const total = this.users.length;
    const admins = this.users.filter((item) => item.role === 'admin').length;
    const active = this.users.filter((item) => item.status === 'active').length;
    const suspended = this.users.filter((item) => item.status === 'suspended').length;

    return { total, admins, active, suspended };
  }

  findOne(id: string): UserRecord {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string): UserRecord | undefined {
    return this.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  }

  create(dto: CreateUserDto): UserRecord {
    const created: UserRecord = {
      id: randomUUID(),
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    this.users = [created, ...this.users];
    return created;
  }

  update(id: string, dto: UpdateUserDto): UserRecord {
    const existing = this.findOne(id);
    const updated: UserRecord = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    this.users = this.users.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: string): { deleted: boolean } {
    this.findOne(id);
    this.users = this.users.filter((item) => item.id !== id);
    return { deleted: true };
  }

  getProfile(authUser: AuthUser): UserRecord {
    const existing = this.findByEmail(authUser.email);

    if (existing) {
      return existing;
    }

    const created: UserRecord = {
      id: authUser.id,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role,
      status: 'active',
      phone: '',
      updatedAt: new Date().toISOString(),
    };

    this.users = [created, ...this.users];
    return created;
  }
}
