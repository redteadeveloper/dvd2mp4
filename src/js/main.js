const { dialog } = require('electron').remote
const hbjs = require('handbrake-js')

function test() {

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {

        if (!response.canceled) {
            let dir = response.filePaths[0]

            console.log(dir)

            let splitArr = dir.split("\\")
            let filename = splitArr[splitArr.length-1]

            hbjs.spawn({ input: dir, output: `${filename}.mp4` })
                .on('error', err => {
                    console.log("Invalid folder selected")
                })
                .on('progress', progress => {
                console.log(progress.percentComplete + "% complete / ETA: " + progress.eta )
            })

        } else {
            console.log("No folder selected")
        }
    })
}