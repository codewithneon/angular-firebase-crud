import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Students } from './students';
@Injectable({ providedIn: 'root' })
export class StudentsService {
  private dbPath = '/students';
  list: AngularFireList<Students> = null;
  single: AngularFireObject<Students>;
  constructor(private db: AngularFireDatabase) {
    this.list = db.list(this.dbPath);
  }
  create(student: Students): void {
    this.list.push(student);
  }
  update(key: string, value: any): Promise<void> {
    return this.list.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.list.remove(key);
  }
  getList(): AngularFireList<Students> {
    return this.list;
  }
  get(id: string) {
    return this.single = this.db.object(this.dbPath + '/' + id);
  }
  deleteAll(): Promise<void> {
    return this.list.remove();
  }
}
