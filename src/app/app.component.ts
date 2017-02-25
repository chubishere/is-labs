import { Component } from '@angular/core';
import '../sass/main.scss';
import { Project } from './data-projects';

@Component({
	selector: 'my-app',
	template: `
	<h1>Hello {{name}}</h1>
	<div>
		<h2>Projects</h2>
		<div class="projects-list projects-list--head">
			<div class="projects-list__item">
				<div class="projects-list__field client"
					(click)="sortBy('project')"
				>Project</div>
				<div class="projects-list__field client"
					(click)="sortBy('client')"
				>Client</div>
				<div class="projects-list__field start-date"
					(click)="sortBy('start_date')"
				>Start date</div>
				<div class="projects-list__field end-date"
					(click)="sortBy('end_date')"
				>End date</div>
				<div class="projects-list__field end-date-admin"
					(click)="sortBy('end_date_admin')"
				>Admin end date</div>
				<div class="projects-list__field stack"
					(click)="sortBy('stack')"
				>Stack</div>
				<div class="projects-list__field ssl-expiration"
					(click)="sortBy('ssl_expiration')"
				>SSL expiration</div>
			</div>
		</div>
		<ul class="projects-list list-unstyled">
			<li class="projects-list__item"
				*ngFor="let p of projects; let odd = odd; let even = even"
				[ngClass]="{even:even, odd:odd}"
			>
				<div class="projects-list__field project">{{p.project}}</div>

				<div class="projects-list__field client">{{p.client}}</div>

				<div class="projects-list__field start-date">
					<span class="day">{{p.start_date | date:dateFormat1}}</span>
					<span class="month">{{p.start_date | date:dateFormat2}}</span>
					{{p.start_date | date:dateFormat3}}
				</div>

				<div class="projects-list__field end-date">
					<span class="day">{{p.end_date | date:dateFormat1}}</span>
					<span class="month">{{p.end_date | date:dateFormat2}}</span>
					{{p.end_date | date:dateFormat3}}
				</div>

				<div class="projects-list__field admin-end-date">
					<span class="day">{{p.end_date_admin | date:dateFormat1}}</span>
					<span class="month">{{p.end_date_admin | date:dateFormat2}}</span>
					{{p.end_date_admin | date:dateFormat3}}
				</div>

				<div class="projects-list__field stack">
					{{p.stack}}
				</div>

				<div class="projects-list__field ssl-expiration">
					<span class="day">{{p.ssl_expiration | date:dateFormat1}}</span>
					<span class="month">{{p.ssl_expiration | date:dateFormat2}}</span>
					{{p.ssl_expiration | date:dateFormat3}}
				</div>
			</li>
		</ul>
	</div>
	`
})
export class AppComponent {
	name: string = 'Roberto';
	dateFormat1: string = 'd';
	dateFormat2: string = 'MMM';
	dateFormat3: string = 'y';
	projects: Array < Project > = Project.load();

	sortBy(field: string) {
		this.projects.sort((a:Project, b:Project) => {
			let x = a[field].toUpperCase(), y = b[field].toUpperCase();
			if(x < y) return -1;
			if(x > y) return 1;
			return 0;
		});
	}
}