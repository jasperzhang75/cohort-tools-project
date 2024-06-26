// const mongoose = require("mongoose")
// // mongoose
// // 	.connect("mongodb://localhost/cohorts-135")
// // 	.then((db) => {
// // 		console.log(`Connected to ${db.connection.name}`)
// // 	})
// // 	.catch(console.error)

// /**
//  * IIFE
//  *
//  * Immediately Invoked Function Execution
//  */

// const DB_URI = process.env.MONGO_URI || "mongodb://localhost/cohorts-135"

// ;(async function () {
// 	try {
// 		const db = await mongoose.connect(DB_URI)
// 		console.log(`Connected to ${db.connection.name}`)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })()
