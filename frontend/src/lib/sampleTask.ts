function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPriority() {
    const priorities = ['Alta', 'Media', 'Baja'];
    return priorities[randomInt(0, priorities.length - 1)];
}
// eslint-disable-next-line
function pad(n: number) {
    return n < 10 ? '0' + n : n;
}

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const tareas = [];

const START_DATE = new Date('2025-05-01T06:00:00');
randomDate(START_DATE, new Date('2025-06-30T20:00:00'));

for (let i = 1; i <= 300; i++) {
    
    const randomDateTime = randomDate(
        new Date('2025-05-01T06:00:00'),
        new Date('2025-06-30T20:00:00')
    );

    
    const minutes = Math.floor(randomDateTime.getMinutes() / 5) * 5;
    randomDateTime.setMinutes(minutes, 0, 0);

    const finDateTime = new Date(randomDateTime.getTime() + 30 * 60000); 

    tareas.push({
        id: i,
        titulo: `Tarea #${i} - Asunto importante`,
        descripcion: `Descripción de la tarea número ${i}, una actividad necesaria para cumplir objetivos.`,
        inicio: randomDateTime.toISOString(),
        fin: finDateTime.toISOString(),
        prioridad: randomPriority(),
    });
}

export const sampleTasks = tareas;
