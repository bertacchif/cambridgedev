"use strict";

const projectName="Kitchen Renovation"
console.log(`Project: ${projectName}`)

let budget = 600
console.log(`Current budget: ${budget}`)

let tiles = 50
let paint = 3
let tileCost = 10
let paintCost = 50

let totalTilesCost = tiles * tileCost
let totalPaintCost = paint * paintCost

console.log(`Total tiles cost: ${totalTilesCost}$`)
console.log(`Total paint cost: ${totalPaintCost}$`)

budget -= totalTilesCost
console.log(`Budget after purchasing tiles: ${budget}`)

budget -= totalPaintCost
console.log(`Budget after purchasing paint: ${budget}`)


if (budget < 0) {
  console.log("Budget below 0!🛑")
} else {
  console.log("Purchases are within budget 👍.")
}

console.log(" ")
console.log("Start over.")
budget = 600
console.log("Current budget:", budget)

if (totalTilesCost < budget) {
  console.log("Purchase tiles")
} else {
  console.log("Cannot purchase tiles")
}

if (totalPaintCost < budget) {
  console.log("Purchase paint")
} else {
  console.log("Cannot purchase paint")
}

const BUDJET_THRESHOLD = 200
if (budget < BUDJET_THRESHOLD) {
  console.log("Budget is below 200 ⚠️")
}


let n1 = 40
if (n1 > 0 ) {
  console.log("positive")
} else {
  console.log("negative")
}

let isLoggedIn = false
if (isLoggedIn) {
  console.log("Welcome back")
} else {
  console.log("Pleas log in")
}

let age = 87
if (age < 13) {
  console.log("Child")
} else if (age < 17) {
  console.log("Teen")
} else {
  console.log("Adult")
}


let password = "thisIsMyRealPassword"
if (password.length >= 8) {
  console.log("Strong password")
} else {
  console.log("Not strong enough")
}

isLoggedIn=true
let isAdmin=true


if (isLoggedIn && isAdmin) {
  console.log("Welcome Admin")
} else if (isLoggedIn && !isAdmin) {
  console.log("Welcome user")
} else if (!isLoggedIn) {
  console.log("Please login")
}

if (!isLoggedIn) {
  console.log("Please login")
} else if (isAdmin) {
  console.log("Welcome admin")
} else {
  console.log("Welcome user")
}

let total = 120
let isMember = true

if (total > 100) {
  if (isMember) {
    total *= .8
  } else {
    total *= .9
  }
}
console.log(`Total after discount: ${total}`)

let score = 50
if (score >= 90) {
  console.log("A")
} else if (score >= 80) {
  console.log("B")
} else if (score >= 70) {
  console.log("C")
} else if (score >= 60) {
  console.log("D")
} else if (score < 60){
  console.log("F")
} else {
  console.log("invalid score")
}


/************* PAIR PROGRAMMING ************/
const age = 25
const isMember = true
const isWeekend = false
let price = 20

if (age >= 65) {
  price = 10
} else if (age < 12) {
  price = 8
}

if (isMember) {
  price -= 3
} else {
  price += 5
}

console.log(price)
