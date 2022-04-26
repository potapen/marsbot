const instruction = {
    "maxCommands": 100,
    "maxNorth": 50,
    "maxEast": 50
}
const maxCommands = 10
const maxNorth = 10
const maxEast = 10

let robot = {
    x:0,
    y:1,
    d:'N'
}



const commands = ['F','F','L','F']


//compute delta for F command
const deltaForward = (position) => {
    console.log('moving forward')
    let delta = {}
    switch(position.d){
        case 'N':
            delta = {x:0,y:1,d:'N'}
            break
        case 'S':
            delta = {x:0,y:-1, d:'S'}
            break
        case 'W':
            delta = {x:-1,y:0,d:'W'}
            break
        case 'E':
            delta = {x:+1,y:0,d:'E'}
            break
    }
    return delta
}

//compute delta for L command
const deltaLeft = (position) => {
    console.log('turning left')
    let delta = {}
    switch(position.d){
        case 'N':
            delta = {x:0,y:0,d:'W'}
            break
        case 'S':
            delta = {x:0,y:0,d:'E'}
            break
        case 'W':
            delta = {x:0,y:0,d:'S'}
            break
        case 'E':
            delta = {x:0,y:0,d:'N'}
            break
    }
    return delta
}

//compute delta for R command
const deltaRight = (position) => {
    console.log('turning right')
    let delta = {}
    switch(position.d){
        case 'N':
            delta = {x:0,y:0,d:'E'}
            break
        case 'S':
            delta = {x:0,y:0,d:'W'}
            break
        case 'W':
            delta = {x:0,y:0,d:'N'}
            break
        case 'E':
            delta = {x:0,y:0,d:'S'}
            break
    }
    return delta
}


//compute delta move according to movement order (F,L or R)
const deltaMove = (command, position) => {
    console.log('currentPosition', position)
    let delta = {}
    switch(command){
        case 'F':
            delta = deltaForward(position)
            break
        case 'L':
            delta = deltaLeft(position)
            break
        case 'R':
            delta = deltaRight(position)
            break
    }
    return delta
}



//manage moving forward from current position and delta. The edge case are managed here
const moveForward = (delta, position, maxEast, maxNorth ) => {
    const nextX = position.x + delta.x
    const nextY = position.y + delta.y
    let pNext
    if(delta.x){
        console.log('moving on x')
        if(nextX<0 || nextX>=maxEast){
        pNext = {
            ...position,
            offTheMap: true
            }
        }else{
        pNext = {
            ...position,
            x:position.x + delta.x
            }
        }
    }
    else if(delta.y){     
        if(nextY<0 || nextY>=maxNorth){
            console.log('moving on y')
            pNext = {
                ...position,
                offTheMap: true
                }
        }else{
            pNext = {
                ...position,
                y:position.y + delta.y
                }
        }
    }else{
        pNext = {...position}
    }
    console.log('pNext', pNext)
    return pNext
}

//make a total move from current position and delta: moving forward AND rotation
const move = (delta, position) => {
    const p = {...position}
    //move forward if needed
    const pNext = moveForward(delta, position, maxEast, maxNorth)
    //rotate if needed
    pNext.d = delta.d
    return pNext
}

const main = () => {
    //go through each commands (F,L,R) unless the robot is falling off the cliff
    for(let i=0; i<commands.length;i++){
        console.log('-----------------------------------')
        //compute the next step (moving +/- on x or y, with final facing direction)
        const delta = deltaMove(commands[i], robot)
        console.log('delta', delta)
        //compute the new position from current position and the delta
        const newPosition = move(delta, robot)
        console.log('newPosition', newPosition)
        robot = newPosition
        //the robot fell off the cliff, final position before falling is stored
        if(robot.offTheMap){break} 
    }
}

main()