import { Component, HostListener } from '@angular/core';
import * as moment from 'moment';
import '../sass/main.scss';
import { Project } from './data-projects';

@Component({
	selector: 'my-app',
	template: `
	<div>
		<h2 class="pad--lots">IdeaStream Projects</h2>

		<div class="projects-filters pad--lots">
			<h2>Filters:</h2>
			<ul class="filters list-unstyled">

				<li (click)="viewAll()">
					<span [ngClass]="{selected: _filter == 'none'}"
				>None</span></li>

				<li id="endedLast" (click)="viewEnded(7)">
					<span [ngClass]="{selected:_filter == 'ended-last'}">
						Ended last <span>7 days</span> ({{endedXDays(7).length}})
					</span>
				</li>
				
				<li id="startedLast" (click)="viewStarted(7)">
					<span [ngClass]="{selected:_filter == 'started-last'}">
						Started last <span>7 days</span> ({{startedXDays(7).length}})
					</span>
				</li>

				<li id="startsIn" (click)="viewStarts(7)">
					<span [ngClass]="{selected:_filter == 'starts-in'}">
						Starts in <span>7 days</span> ({{startsXDays(7).length}})
					</span>
				</li>
			</ul>
		</div>

		<div class="projects-list projects-list--head">
			<div class="projects-list__item">

				<div class="projects-list__field project icon alpha"
					(click)="sortBy('project')"
					[ngClass]="{'up': _sorts['project'] == 1, 'down': _sorts['project'] == -1}"
				>Project</div>

				<div class="projects-list__field client icon alpha"
					(click)="sortBy('client')"
					[ngClass]="{'up': _sorts['client'] == 1, 'down': _sorts['client'] == -1}"
				>Client</div>

				<div class="projects-list__field start-date icon numeric"
					(click)="sortBy('start_date')"
					[ngClass]="{'up': _sorts['start_date'] == 1, 'down': _sorts['start_date'] == -1}"
				>Start date</div>

				<div class="projects-list__field end-date icon numeric"
					(click)="sortBy('end_date')"
					[ngClass]="{'up': _sorts['end_date'] == 1, 'down': _sorts['end_date'] == -1}"
				>End date</div>

				<div class="projects-list__field end-date-admin icon numeric"
					(click)="sortBy('end_date_admin')"
					[ngClass]="{'up': _sorts['end_date_admin'] == 1, 'down': _sorts['end_date_admin'] == -1}"
				>Admin end date</div>

				<div class="projects-list__field response-rate icon alpha"
					(click)="sortBy('response_rate')"
					[ngClass]="{'up': _sorts['response_rate'] == 1, 'down': _sorts['response_rate'] == -1}"
				>Response rate</div>

				<div class="projects-list__field stack icon alpha"
					(click)="sortBy('stack')"
					[ngClass]="{'up': _sorts['slack'] == 1, 'down': _sorts['slack'] == -1}"
				>Stack</div>

				<div class="projects-list__field ssl-expiration numeric"
					(click)="sortBy('ssl_expiration')"
					[ngClass]="{'up': _sorts['ssl_expiration'] == 1, 'down': _sorts['ssl_expiration'] == -1}"
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

				<div class="projects-list__field response-rate">
					{{p.response_rate_string}}
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
	projectsLoaded: Array<Project> = Project.load();
	projects: Array<Project> = this.projectsLoaded.slice();
	_sorts:{} = {};
	_contextMenus: Array<string> = ['startsIn', 'endedLast'];
	_filter:string = 'none';

	@HostListener('window:contextmenu', ['$event'])
	onContextMenu(event:any){
		let id = event.target.getAttribute('id');
		if( this._contextMenus.indexOf(id) !== -1 ) {
			this[id + 'ContextMenuVisible'];
			event.preventDefault();
		}
	}

	endedXDays(x:number):Array<any> {
		return this.projectsLoaded.filter(p => {
			let now = moment();
			let before = moment(now).subtract(x, 'days');
			return moment(p.end_date).isBetween(before, now);
		});
	}

	startedXDays(x:number):Array<any> {
		 return this.projectsLoaded.filter(p => {
			let now = moment();
			let before = moment(now).add(x, 'days');
			return moment(p.start_date).isBetween(now, before);
		});
	}

	startsXDays(x:number):Array<any> {
		return this.projectsLoaded.filter(p => {
			let now = moment();
			let later = moment(now).add(x, 'days');
			return moment(p.end_date).isBetween(now, later);
		});
	}

	viewAll():void {
		this.projects = this.projectsLoaded.slice();
		this._filter = 'none';
	}

	viewEnded(days:number):void {
		this.projects = this.endedXDays(days);
		this._filter = 'ended-last';
	}

	viewStarted(days:number):void {
		this.projects = this.projectsLoaded.filter(p => {
			let now = moment();
			let before = moment(now).add(days, 'days');
			return moment(p.start_date).isBetween(now, before);
		});
		this._filter = 'started-last';
	}

	viewStarts(days:number):void {
		this.projects = this.startsXDays(days);
		this._filter = 'starts-in';
	}

	sortBy(field: string):void {
		if( this._sorts[field] === undefined ) {
			this._sorts[field] = 0;
		}
		if(++this._sorts[field] > 1) {
			this._sorts[field] = -1;
		}
		this.projects.sort((a:Project, b:Project) => {
			if (typeof a[field] == 'number') {
				return (this._sorts[field] === 1)? a[field] - b[field]: b[field] - a[field];
			}
			let x = a[field].toUpperCase(), y = b[field].toUpperCase();
			if(x < y) return -1 * this._sorts[field];
			if(x > y) return 1 * this._sorts[field];
			return 0;
		});
	}
}