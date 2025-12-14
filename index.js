const mongoose = require('mongoose');

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Connect to MongoDB
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.log("Error occurred during connection: " + err);
});

db.once('connected', () => {
  console.log(`Connected to ${MONGO_URI}`);
});

// Define schema
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  Gender: String,
  Salary: Number
});

// Create model
const person_doc = mongoose.model('modelname', PersonSchema, 'personCollection');

// Task 1: Add a single document
const doc1 = new person_doc({ name: 'Jacky', age: 36, Gender: "Male", Salary: 3456 });

doc1.save()
  .then((doc) => {
    console.log("Single document added:", doc);
  })
  .catch((err) => console.error(err))
  .finally(() => {
    
    // Task 2: Add multiple documents
    const manypersons = [
      { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
      { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
      { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
      { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
    ];

    person_doc.insertMany(manypersons)
      .then(() => console.log("Multiple documents inserted"))
      .catch((err) => console.error(err))
      .finally(() => {

    // Task 3: Fetch all documents (limit 5)
    person_doc.find().limit(5)
        .then(docs => {
          console.log("First 5 documents:", docs);
        })
        .catch(err => console.error(err))
        .finally(() => {

    // Task 4: Fetch documents with filter
    person_doc.find({ Gender: "Female", age: { $gt: 25 } })
        .then(docs => {
         console.log("Female documents with age > 25:", docs);
        })
        .catch(err => console.error(err))
        .finally(() => {

    // Task 5: Count total documents
    person_doc.countDocuments().exec()
        .then(count => console.log("Total documents count:", count))
        .catch(err => console.error(err))
        .finally(() => {

    // Task 6: Delete documents where age >= 25
    person_doc.deleteMany({ age: { $gte: 25 } })
        .exec()
        .then(result => console.log("Deleted documents:", result))
        .catch(err => console.error(err))
        .finally(() => {

    // Task 7: Update female documents salary to 5555
    person_doc.updateMany({ Gender: "Female" }, { Salary: 5555 })
        .exec()
        .then(result => console.log("Updated documents:", result))
        .catch(err => console.error(err))
        .finally(() => {
    console.log("All tasks completed!");
    mongoose.connection.close();
                        });
                    });
                });
            });
        });
    });
});
