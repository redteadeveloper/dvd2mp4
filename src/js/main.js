const { dialog } = require('electron').remote
const hbjs = require('handbrake-js')

let arr = []

function run() {

    document.getElementById('status').value = "Please select directory"

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {

        if (!response.canceled) {
            let dir = response.filePaths[0]
            console.log(dir)

            document.getElementById('status').value = "Scanning titles"

            let splitArr = dir.split("\\")
            let filename = splitArr[splitArr.length - 1]

            hbjs.spawn({ input: dir, output: `${dir}\\${filename}.mp4`, title: 0 })
            .on('error', err => {
                console.error(err)
                document.getElementById('status').value = "Invalid folder selected"
            })
            .on('output', output => {  
                arr.push(output.toString())
            })
            .on('complete', () => {
                let titles = arr.join("").match(/\+ title [0-9]/g)
                console.log(titles)
            
                titles.forEach(element => {

                    let titlenum = element.replace( /^\D+/g, '')

                    hbjs.spawn({ input: dir, output: `${dir}\\${filename}-${titlenum}.mp4`, title: parseInt(titlenum) })
                    .on('error', err => {
                        console.error(err)
                        document.getElementById('status').value = "Invalid folder selected"
                    })
                    .on('progress', progress => {
                        document.getElementById('status').value = progress.percentComplete + "% complete"
                    })
                })
            })

        } else {
            console.log("No folder selected")
        }
    })
}