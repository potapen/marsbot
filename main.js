let robot = {
    x:3,
    y:2,
    d:'N'
}


const commands = ['F','F','L','F']

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

const move = (delta, position) => {
    const p = {...position}
    p.x = p.x + delta.x
    p.y = p.y + delta.y
    p.d = delta.d
    return p
}
console.log('commands', commands)
commands.forEach(direction => {
    let delta = deltaMove(direction, robot)
    console.log('delta', delta)
    let newPosition = move(delta, robot)
    console.log('newPosition', newPosition)
    // console.log(`oldposition ${robot.x}|${robot.y}|${robot.d} direction: ${direction} delta :${delta.x}|${delta.y}|${delta.d} newPosition ${newPosition.x}|${newPosition.y}|${newPosition.d}`)
    robot = newPosition
})