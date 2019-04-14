const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLInt},
    })
});


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type:GraphQLString},
            },
            resolve(parentValue, args) {
                // for(let i = 0; i < customers.length; i++) {
                //     if(customers[i].id == args.id) {
                //         return customers[i]
                //     }
                // }
                return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data)
                .catch(err => console.log(err))
            }
      },
      customers: {
          type: new GraphQLList(CustomerType),
          resolve(parentValue, args) {
            return axios.get('http://localhost:3000/customers/')
            .then(res => res.data)
            .catch(err => console.log(err))
          }
      }
    }
})


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/customers/', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data)
                .catch(err => console.log(err))
              }
        },

        deleteCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/customers/' + args.id, {
    
                })
                .then(res => res.data)
                .catch(err => console.log(err))
              }
        },

        updateCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                .then(res => res.data)
                .catch(err => console.log(err))
              }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});

/*

with this set up we could now go to 
localhost:4000/graphql

 and we could now try to run the following

 {
   customer(id: "1") {
     email,
     age
   }
 }

 or

 {
   customers {
     name,
     email
   }
 }



 mutation {
  addCustomer(
    name: "Ilaria",
  	email: "ila@ila.com",
  	age: 28
  ) {
    id,
    name,
    email
  }
}

mutation {
  deleteCustomer(
		id: "4"
  ) {
    id
  }
}

mutation {
  updateCustomer(
		id: "3",
    name: "Melanie Smellanie"
  ) {
    id,
    name,
    email
  }
}


*/

