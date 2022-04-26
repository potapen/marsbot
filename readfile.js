const readline = require('readline')

const parseFile=()=>{
    const lineReader = readline.createInterface({
      input: require('fs').createReadStream(__dirname + '/instructions.txt'),
    })
    
    const gridSize = {}
    const positionsList = []
    const commandsList = []
    let parsedObject = {}
    let lineCounter = 0
    
    lineReader.on('line', (line) => {
        if(!lineCounter){
            const arr = line.split(' ')
            gridSize.x = Number(arr[0])
            gridSize.y = Number(arr[1])
            console.log('gridSize', gridSize)
        }else{
            if(lineCounter%2===1){
                const pA = line.split(' ')
                const position = {
                    x: pA[0],
                    y: pA[1],
                    d: pA[2],
                }
                console.log(position)
                positionsList.push(position)
    
            }else{
                const commands = line.split('')
                console.log(commands)
                commandsList.push(commands)
    
            }
        }
        lineCounter++
        //printLine(line, lineCounter)
    })
    
    lineReader.on('close', () => {
      console.log('We could now execute some final action')
      parsedObject = {
        gridSize,
        positionsList,
        commandsList
        }
        console.log('----------',parsedObject)
    })
    return parsedObject
    // const printLine = (line, i) => {
    //   console.log(`Line ${i.toString().padStart(2, '0')}: ${line}`)
    // }


}

const parsedObject = parseFile()
console.log('parsedObject',parsedObject)