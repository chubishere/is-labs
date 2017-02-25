import * as moment from 'moment';

export class Project {
    
    //
    // ─── STATIC METHODS ─────────────────────────────────────────────────────────────
    //
        
    static load():Array<Project> {
        let out:Array<Project> = [];
        let i = 100;
        while (i--) {
           out.push(new Project); 
        }
        return out;
    }

    //
    // ─── INSTANCE VARS ──────────────────────────────────────────────────────────────
    //

    client:string;
    project:string;
    start_date:string;
    end_date:string;
    end_date_admin:string;
    stack:string;
    ssl_expiration:string;

    constructor() {

        //
        // ─── CLIENT ────────────────────────────────────────────────
        //
        this.client = this.randomFrom(['Insites', 'MMR', 'FaceGroup', 'Behavioural Architects', 'Verve']);

        //
        // ─── PROJECT NAME ────────────────────────────────────────────────
        //
        this.project = 
            this.randomFrom(['Dog', 'Face', 'Leg', 'Elderly', 'Train', 'Driver', 'Idol', 'Animal', 'Food'])
            + this.randomFrom(['Project', 'Diaries', 'Community', 'Care', 'Appreciation', 'Lovers Anonymous', 'Peevs', 'Spotters Club', 'Afficiandos Survey']);

        //
        // ─── DATES ──────────────────────────────────────────────────
        //
        let start           = moment().add((Math.floor(Math.random()*100) - 50), 'days');
        let end             = start.add(Math.ceil(Math.random()*100), 'days');
        let end_admin       = end.add(6, 'months');
        let ssl_expiration  = end.add(Math.ceil(Math.random()*100), 'days');
        this.start_date     = start.format();
        this.end_date       = end.format();
        this.end_date_admin = end_admin.format();
        if (Math.random() < 0.2) {
            this.ssl_expiration = end_admin.format();
        }

        //
        // ─── STACK ───────────────────────────────────────────────────────
        //
        this.stack = this.randomFrom(['ASIA', 'EU', 'US']);

    }

    private randomFrom(items:Array<any>):any {
        return items[Math.floor(Math.random() * items.length)];
    }
}