const textElement = document.getElementById('text')
const opetionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id == textNodeIndex)
    textElement.innerText = textNode.text
    while (opetionButtonsElement.firstChild) {
        opetionButtonsElement.removeChild(opetionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            opetionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state) 
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange jungle and you see a Magical Blue Magpie near you...',
        options: [
            {
                text: 'Approach the bird',
                setState: { blueMagpie: true },
                nextText: 2
            },
            {
                text: 'Leave the bird',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'As you attempt to get up, burning pain pierced through your right thigh...',
        options: [
            {
                text: 'Let the Magpie heal your wound',
                requiredState: (currentState) => currentState.blueMagpie,
                setState: { healed: true },
                nextText: 3
            },
            {
                text: 'Let the Magpie lighten your path',
                requiredState: (currentState) => currentState.blueMagpie,
                setState: { lightenedpath: true },
                nextText: 3
            },
            {
                text: 'Return to the Magpie',
                requiredState: (currentState) => !currentState.blueMagpie,
                setState: { blueMagpie: true },
                nextText: 3
            },
            {
                text: 'Call 911',
                nextText: 4
            }
        ]

    },
    {
        id: 3,
        text: 'You bled to death while trying to talk to a bird. Very sad.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 4,
        text: 'The police rescused you from the jungle. Nice job!',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()