import { Component } from '@angular/core';
import '../sass/main.scss';
import {Project} from './data-projects';

@Component({
  selector: 'my-app',
  template: `
	<h1>Hello {{name}}</h1>
	<div>
		<h2>Projects</h2>
		<div class="projects-list">
			<div class="projects-list__item">
				<div class="projects-list__field client">Client</div>
				<div class="projects-list__field client">Project</div>
				<div class="projects-list__field start-date">Start date</div>
				<div class="projects-list__field end-date">End date</div>
				<div class="projects-list__field stack">Stack</div>
				<div class="projects-list__field ssl-expiration">SSL expiration</div>
			</div>
		</div>
		<ul class="projects-list list-unstyled">
			<li class="projects-list__item"
				*ngFor="let p of projects; let odd = odd; let even = even"
				[ngClass]="{even:even, odd:odd}"
			>
				<div class="projects-list__field client">{{p.client}}</div>
				<div class="projects-list__field project">{{p.project}}</div>
				<div class="projects-list__field start-date">{{p.start_date | date:'short'}}</div>
				<div class="projects-list__field end-date">{{p.end_date | date:'short'}}</div>
				<div class="projects-list__field stack">{{p.stack}}</div>
				<div class="projects-list__field ssl-expiration">{{p.ssl_expiration}}</div>
			</li>
		</ul>
	</div>
	`
})
export class AppComponent { 
	name:String = 'Roberto';
	projects:Array<Project> = Project.load();
}