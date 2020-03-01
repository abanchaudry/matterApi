const _ = require('lodash');
var moment = require('moment');

const { Sale, validate } = require('../../models/sale');
// const {Product} = require('../app/models/product');
 

class Offers{
    // function to execute the search query of Send transfers
    async ExecuteQuery(value){
        try {
            // console.log('user values',value)
            if(value.Account != null && value.Account != '' && value.Status == ''){     
                // console.log('account')      
                var result = this.QueryByDateAndAccount(value);
                return result
            }else if(value.Status != null && value.Status != '' && value.Account == ''){
                // console.log('status')
                var result = this.QueryByDateAndStatus(value);
                return result
            }else if(value.Account != null && value.Account != '' && value.Status != null && value.Status != ''){
                // console.log('all')
                var result = this.QueryByDateAndAccountAndStatus(value);
                return result
            }else{
                // console.log('date')
                var result = this.QueryByDate(value);
               return result
            }
            
        } catch (error) {
            return error
        }
    }

    // function to get send transfers by only dates
    async QueryByDate(value){
        try {           
            // const UserID = value.userId 
            // var end = value.endDate	
            var start = value.startDate            
            // convert date to one Day before  
            // var endpreDay = moment(end).add(1, 'days').toDate();
            var startpreDay = moment(start).toDate();  
            const result = await Sale.aggregate([   
                {$match: {created_at: {$gte: startpreDay}}},          
            ]);
            // condition to check the query response     
            if (result && result.length){
                return result		
            }else{
                return
            }
            
        } catch (error) {
            return error
        }
    }

    // function to get send transfers by only dates
    async QueryByDateAndStatus(value){
        try {           
            const UserID = value.userId 
            var end = value.endDate	
            var start = value.startDate        
            var status =value.Status    
            // convert date to one Day before  
            var endpreDay = moment(end).add(1, 'days').toDate();
            var startpreDay = moment(start).toDate();  
            const result = await SendTransfer.aggregate([   
                {$match: {user_id: UserID, "sendTransfer.ProcessingState": status, created_at: {$gte: startpreDay,	$lte: endpreDay}}},          
            ]);
            // condition to check the query response     
            // console.log(result)
            if (result && result.length){
                return result		
            }else{
                return
            }
            
        } catch (error) {
            return error
        }
    }

    // function to get send transfers by only dates
    async QueryByDateAndAccount(value){
        try {           
            const UserID = value.userId 
            var end = value.endDate	
            var start = value.startDate        
            var account =value.Account    
            // convert date to one Day before  
            var endpreDay = moment(end).add(1, 'days').toDate();
            var startpreDay = moment(start).toDate();  
            const result = await SendTransfer.aggregate([   
                {$match: {user_id: UserID, "sendTransfer.AccountNumber": account, created_at: {$gte: startpreDay,	$lte: endpreDay}}},          
            ]);
            // condition to check the query response     
            if (result && result.length){
                return result		
            }else{
                return
            }
            
        } catch (error) {
            return error
        }
    }

    // function to get send transfers by only dates
    async QueryByDateAndAccountAndStatus(value){
        try {            
            const UserID = value.userId 
            var end = value.endDate	
            var start = value.startDate        
            var status =value.Status  
            var account =value.Account   
            // convert date to one Day before  
            var endpreDay = moment(end).add(1, 'days').toDate();
            var startpreDay = moment(start).toDate();  
            const result = await SendTransfer.aggregate([   
                {$match: {user_id: UserID,"sendTransfer.AccountNumber": account,
                 "sendTransfer.ProcessingState": status, created_at: {$gte: startpreDay,	$lte: endpreDay}}},          
            ]);
            // condition to check the query response     
            if (result && result.length){
                return result		
            }else{
                return
            }
            
        } catch (error) {
            return error
        }
    }

    // function to  add all providers to the products
    async AddAllProducts(val){
        // console.log('All product function', )    
        const provider = []
        const value = provider
        try {
              //  console.log(value.Items[0]);
        Product.find().then(product=> {
            if (product){
                product.forEach(async (element) => {
                    // console.log('code',element.product.ProviderCode)
                    const code = element.product.ProviderCode
                    code.toString();
                    for(let i=0; i<=value.Items.length; i++){
                        // console.log(i,value.Items[i].ProviderCode)
                        if (value.Items[i].ProviderCode == code){
                            // console.log('looks good')
                           await element.updateOne({
                               $set:{
                                        provider: value.Items[i],
                                        updated_at: Date.now()
                                    }
                                }).then({

                            })
                                break;
                        }
                        
                    }
                });
            }
          })  
            
        } catch (error) {
            return error
        }

    }
    

}

module.exports = new Offers();