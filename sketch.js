// from https://stackoverflow.com/a/65638217
function shuffle(t) {
  let last = t.length
  let n
  while (last > 0) {
    n = rand(last)
    swap(t, n, --last)
  }
}

const rand = n => 0 | Math.random() * n

function swap(t, i, j) {
  let q = t[i]
  t[i] = t[j]
  t[j] = q
  return t
}

////////

const items = document.querySelector("#items")

let names = [
  "!Adeshina",
  "!Funsho",
  "!Ajide",
  "!Uzoamaka",
  "!Okoro",
  "!Ejiogu",
  "!Amaechi",
  "!Oriyomi",
  "?Kazuha",
  "?Asami",
  "?Chigusa",
  "?Momoko",
  "?Machiko",
  "?Fujie",
  "?Ranze",
  "?Kozo"
]

shuffle(names)

let words = new Set();
let i = 0;

for (let name of names) {
  let row = document.createElement("tr")
  let item = document.createElement("td")
  let word = document.createElement("span")
  item.classList.add("worditem")
  word.textContent = name.slice(1)
  item.append(word)
  
  
  let ntd = document.createElement("td")
  let nigerian = document.createElement("button")
  nigerian.classList.add("nigerian")
  nigerian.innerHTML = "&nbsp;"
  let nigerian2 = document.createElement("span")
  nigerian2.classList.add("nigerian2")
  nigerian2.innerHTML = "&nbsp;"
  
  ntd.append(nigerian)
  ntd.append(nigerian2)
  
  let jtd = document.createElement("td")
  let japanese = document.createElement("button")
  japanese.classList.add("japanese")
  japanese.innerHTML = "&nbsp;"
  
  jtd.append(japanese)
  
  let data = [item,name[0],nigerian,japanese]
  
  nigerian.addEventListener("click", () => {
    if (item.classList.contains("worditem-j"))
      item.classList.add("worditem-jn")
    item.classList.add("worditem-n")
    item.classList.remove("worditem-j")
    item.classList.remove("worditem-nj")
    words.add(data)
    japanese.setAttribute("tabindex", "")
    nigerian.setAttribute("tabindex", "-1")
    if (words.size === names.length) {
      bouton.disabled = false
    }
  })
  nigerian.addEventListener("keydown", (e) => {
    let next = row.nextElementSibling
    let prev = row.previousElementSibling
    if (e.key === "ArrowUp") {
      if (prev) {
        let prevN = prev.querySelector(".nigerian")
        if (prevN) {
          e.preventDefault()
          prevN.focus()
        }
      }
    }
    if (e.key === "ArrowDown") {
      if (next) {
        let nextN = next.querySelector(".nigerian")
        if (nextN) {
          e.preventDefault()
          nextN.focus()
        }
      }
    }
    if (e.key === "ArrowLeft") {
      if (prev) {
        let prevJ = prev.querySelector(".japanese")
        if (prevJ) {
          e.preventDefault()
          prevJ.focus()
        }
      }
    }
    if (e.key === "ArrowRight") {
      japanese.focus()
    }
  })
  
  japanese.addEventListener("click", () => {
    if (item.classList.contains("worditem-n"))
      item.classList.add("worditem-nj")
    item.classList.remove("worditem-n")
    item.classList.remove("worditem-jn")
    item.classList.add("worditem-j")
    words.add(data)
    japanese.setAttribute("tabindex", "-1")
    nigerian.setAttribute("tabindex", "")
    if (words.size === names.length) {
      bouton.disabled = false
    }
  })
  
  japanese.addEventListener("keydown", (e) => {
    let next = row.nextElementSibling
    let prev = row.previousElementSibling
    if (e.key === "ArrowUp") {
      if (prev) {
        let prevJ = prev.querySelector(".japanese")
        if (prevJ) {
          e.preventDefault()
          prevJ.focus()
        }
      }
    }
    if (e.key === "ArrowDown") {
      if (next) {
        let nextJ = next.querySelector(".japanese")
        if (nextJ) {
          e.preventDefault()
          nextJ.focus()
        }
      }
    }
    if (e.key === "ArrowLeft") {
      nigerian.focus()
    }
    if (e.key === "ArrowRight") {
      if (next) {
        let nextN = next.querySelector(".nigerian")
        if (nextN) {
          e.preventDefault()
          nextN.focus()
        }
      }
    }
  })
  
  row.append(ntd)
  row.append(item)
  row.append(jtd)
  items.append(row)
}
let btr = document.createElement("tr")
let td1 = document.createElement("td")
let btd = document.createElement("td")
let bouton = document.createElement("button") // idk why i named it in french
bouton.setAttribute("id", "bouton")
bouton.textContent = "Check"
bouton.disabled = true
bouton.addEventListener("click", () => {
  let i = 0;
  for (let [item,name,nigerian,japanese] of [...words]) {
    let list = item.classList
    item.parentElement.style.pointerEvents = "none"
    japanese.setAttribute("tabindex", "-1")
    nigerian.setAttribute("tabindex", "-1")
    if (name[0] === "!") {
      if (list.contains("worditem-n")) {
        i++
        nigerian.classList.add("correct")
        list.add("bold")
      } else {
        list.remove("worditem-j")
        list.remove("worditem-nj")
        list.add("worditem-n")
        list.add("worditem-jn")
      }
    } else {
      if (list.contains("worditem-j")) {
        i++
        japanese.classList.add("correct")
        list.add("bold")
      } else {
        list.remove("worditem-n")
        list.remove("worditem-jn")
        list.add("worditem-j")
        list.add("worditem-nj")
      }
    }
  }
  bouton.outerHTML = `${i}/${names.length} correct`
})
btd.append(bouton)
btr.append(td1)
btr.append(btd)
items.append(btr)