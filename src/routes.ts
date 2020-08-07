
import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';


const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {

    const { 
        name,
        avatar,
        watsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const insertedUsersId = await db('users').insert({
        name,
        avatar,
        watsapp,
        bio,
    });

    // para pegar o id
    const user_id = insertedUsersId[0];

    const insertedClassesId = await db('classes').insert({
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

    await db('class_schedule').insert(classSchedule);

   return response.send();

});   

export default routes;
