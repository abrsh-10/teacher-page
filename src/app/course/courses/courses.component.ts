import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses!: any[];
  email: any;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    this.userService.getByEmail(this.email).subscribe((data) => {
      this.courseService.getCourses(data.courses!).subscribe((courses) => {
        this.courses = courses;
      });
    });
  }

  onSelectCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
