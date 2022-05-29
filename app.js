
const colors = {
    2: {
        background: '#aeffae',
        color: '#444'
    }, 
    4: {
        background: '#84fb84',
        color: '#444'
    }, 
    8: {
        background: '#3cf93c',
        color: '#444'
    }, 
    16: {
        background: '#2bb32b',
        color: '#fff'
    },
////
    32: {
        background: '#aeaeff',
        color: '#444'
    }, 
    64: {
        background: '#8484fb',
        color: '#444'
    }, 
    128: {
        background: '#3c3cf9',
        color: '#444'
    }, 
    256: {
        background: '#2b2bb3',
        color: '#fff'
    },
////   
    512: {
        background: '#ffaeae',
        color: '#444'
    }, 
    1024: {
        background: '#fb8484',
        color: '#444'
    }, 
    2048: {
        background: '#f93c3c',
        color: '#444'
    }, 
    4096: {
        background: '#b32b2b',
        color: '#fff'
    },
}

initGame()

/////////// GRID ////////////

function initGame() {
    createGridCells()

    createRandomCellBox()
    createRandomCellBox()

    createKeypress()
}

function resetGame() {
    const removeBoxes = [...document.querySelectorAll('.cell-box')];

    removeBoxes.forEach(box => box.remove());

    createRandomCellBox()
    createRandomCellBox()
}

function createKeypress() {
    const movement = {
        'ArrowUp': moveUp,
        'ArrowDown': moveDown,
        'ArrowLeft': moveLeft,
        'ArrowRight': moveRight,
    }
    addEventListener( 'keydown', function( event ) {
        if ( movement[ event.key ] ) {
            movement[ event.key ]()
            createRandomCellBox()
        }

        createKeypress()
    }, { once: true })
}

function moveUp() {
    for ( let y = 0; y <= 3; y++ ) {
        for ( let x = 3; x >= 0; x-- ) {
            handleMovement( x, y, -1, 0 )
        }
    }
}
function moveDown() {
    for ( let y = 0; y <= 3; y++ ) {
        for ( let x = 0; x <= 3; x++ ) {
            handleMovement( x, y, 1, 0 )
        }
    }
}
function moveLeft() {
    for ( let x = 0; x <= 3; x++ ) {
        for ( let y = 3; y >= 0; y-- ) {
            handleMovement( x, y, 0, -1 )
        }
    }
}
function moveRight() {
    for ( let x = 0; x <= 3; x++ ) {
        for ( let y = 0; y <= 3; y++ ) {
            handleMovement( x, y, 0, 1 )
        }
    }
}

function handleMovement( x, y, offsetX, offsetY ) {
    if ( isEmptyCell( x, y ) ) return false

    // get cells
    const cell = getCell( x, y )
    const cellBox = cell.querySelector( '.cell-box' )
    const nextCell = getCell( x + offsetX, y + offsetY )
    const nextCellBox = nextCell?.querySelector( '.cell-box' )
    
    // no nextcell then exit
    if ( !nextCell ) return false

    // move cell to the next position
    if ( isEmptyCell( x + offsetX, y + offsetY ) ) {
        nextCell.append( cellBox )
        return false
    }

    // merge cells
    if ( cellBox.textContent === nextCellBox.textContent ) {
        const newValue = parseInt(nextCellBox.textContent) * 2
        nextCellBox.innerHTML = newValue
        nextCellBox.style.background = colors[ newValue ].background
        nextCellBox.style.color = colors[ newValue ].color

        cellBox.remove()
    }
}

///////////// CELL //////////////////

function createGridCells() {
    const gridElement = document.querySelector('.grid')

    for ( let x = 0; x <= 3; x++ ) {
        for ( let y = 0; y <= 3; y++ ) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('x', x)
            cell.setAttribute('y', y)

            gridElement.append(cell)
        }
    }
}

function createRandomCellBox() {
    if ( !getAllCells().filter(cell=>!cell.innerHTML).length ) {
        alert( "YOU LOSE !")
        return
    }   

    const x = Math.floor(Math.random() * 4)
    const y = Math.floor(Math.random() * 4)

    if (!isEmptyCell( x, y )) {
        createRandomCellBox()
    }
    
    createCellBox( x, y )
}

function createCellBox( x, y, value ) {
    const cell = getCell( x, y )
    value = value || Math.random() > 0.5 ? 2 : 4

    const cellBox = document.createElement( 'div' )
    cellBox.classList.add( 'cell-box' )
    cellBox.innerHTML = value
    cellBox.style.background = colors[ value ].background

    cell.append( cellBox )
}

function getCell( x, y ) {
    return getAllCells().find( cell => {
        return (
            cell.getAttribute( 'x' ) == x &&
            cell.getAttribute( 'y' ) == y
        )
    })
} 

function isEmptyCell( x, y ) {
    return !getCell( x, y ).innerHTML
}

function getAllCells() {
    return [...document.querySelectorAll('.cell')]
}
