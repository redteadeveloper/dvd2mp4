const { dialog } = require('electron').remote
const hbjs = require('handbrake-js')

function test() {

    document.getElementById('status').value = "Please select directory"

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {

        if (!response.canceled) {
            let dir = response.filePaths[0]

            console.log(dir)

            let splitArr = dir.split("\\")
            let filename = splitArr[splitArr.length-1]

            hbjs.spawn({ input: dir, output: `${dir}\\${filename}.mp4` })
            .on('error', err => {
                document.getElementById('status').value = "Invalid folder selected"
            })
            .on('progress', progress => {
                //console.log(progress.percentComplete + "% complete / ETA: " + progress.eta )
                document.getElementById('status').value = progress.percentComplete + "% complete"
            })

        } else {
            console.log("No folder selected")
        }
    })
}