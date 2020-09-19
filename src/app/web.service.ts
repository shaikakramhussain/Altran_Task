import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }
  addStudent(student) {
    return this.http.post('http://14.99.138.131:9976/student-app/students', student);
  }
  getAll(pageNo, pageSize) {
    return this.http.get('http://14.99.138.131:9976/student-app/students/getStudents/' + pageNo + '/' + pageSize );
  }
  deleteRecord(id) {
    return this.http.delete('http://14.99.138.131:9976//student-app/students/' + id, id);
  }
  getByName(pageNo, pageSize, name) {
    return this.http.get('http://14.99.138.131:9976/student-app/students/getStudents/' + pageNo + '/' + pageSize + '?name=' + name );
  }
}
