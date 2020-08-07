
import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
 
 interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(filters.time as string)

        console.log(timeInMinutes);
        
        return response.send();
    }


    async create(request: Request, response: Response) {

        const { 
            name,
            avatar,
            watsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
        
        try {
    
        const insertedUsersId = await trx('users').insert({
            name,
            avatar,
            watsapp,
            bio,
        });
    
        // para pegar o id
        const user_id = insertedUsersId[0];
    
        const insertedClassesId = await trx('classes').insert({
            subject,
            cost,
            user_id,
        
        });
    
        const class_id = insertedUsersId[0];
    
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return{
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            };
        })
    
        await trx('class_schedule').insert(classSchedule);
    
        await trx.commit();
    
       return response.status(201).send();
    
    }catch(err){
    
        console.log(err);
        
        await trx.rollback();
    
        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })
    }
    
    }
}