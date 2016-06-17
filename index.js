process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (chunk) {
  chunk.split('\n').forEach(x => lines.push(x))
})

var lines = []

function attribute (a) {
  var idx = 0
  current = null
  var re = /(^\w+)\s<(\w+)>/
  var calRe = new RegExp('\.*<(\.*)>$')
  var g = ['digraph G { ',
    ' rankdir=LR;',
    'graph [bgcolor="#020d22"]',
    'node [color="#F2F6FC",fontcolor="#b1e0e8",fontname=Ubuntu,shape=box, margin="0.4,0.05"]',
    'edge [color="#b1e0e8",fontcolor="#b1e0e8",fontname=Ubuntu] '].join('\n')
  ;(function () {
    do {
      var line = a[idx++]
      var matches = re.exec(line)
      if (matches) {
        current = matches[2]
      } else {
        if (line.match(/call\s/)) {
          var calls = calRe.exec(line)
          if (calls[1].match('0x')) { } else {
            g += [' ', current, ' -> ', calls[1]].join('')
          }
        }
      }
      if (idx >= lines.length) {
        break
      }

    } while (1)
      g += '}'
    })()
    console.log(g)
  }

  process.stdin.on('end', function () {
    attribute(lines)
  })
