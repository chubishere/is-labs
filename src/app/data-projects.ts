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
            this.randomFrom(['Dog', 'Face', 'Leg', 'Elderly', 'Train', 'Driver', 'Idol', 'Animal', 'Food', 'Caravan', 'Biplane', 'Perfume'])
            + ' ' +
            this.randomFrom(['Project', 'Diaries', 'Community', 'Care', 'Appreciator Anonymous', 'Lovers Unlimited', 'Peevs', 'Spotters Club', 'Afficiandos Survey']);

        //
        // ─── DATES ──────────────────────────────────────────────────
        //
        let start           = moment().add((Math.floor(Math.random()*100) - 50), 'days');
        let end             = moment(start).add(Math.ceil(Math.random()*100), 'days');
        let end_admin       = moment(end).add(6, 'months');
        let ssl_expiration  = moment(end).add(Math.ceil(Math.random()*100), 'days');

        this.start_date     = start.format();
        this.end_date       = end.format();
        this.end_date_admin = end_admin.format();

        // only some projects will have ssl certs
        if (Math.random() < 0.2) {
            this.ssl_expiration = end_admin.format();
        }else{
            this.ssl_expiration = '';
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