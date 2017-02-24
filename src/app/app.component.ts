import { Component } from '@angular/core';
import '../sass/main.scss';

import {Project, projects} from './data-projects';

@Component({
  selector: 'my-app',
  template: `
		<h1>Hello {{name}}</h1>
		<div>
			<h2>Projects</h2>
			<ul class="projects">
				<li *ngFor="let p of projects">Project {{p}}
					<div>{{p.client}}</div>
				</li>
			</ul>
		</div>
	`
})
export class AppComponent { 
	name:String = 'Roberto';
	projects:Array<Project> = projects;
}