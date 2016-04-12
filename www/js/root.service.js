app.factory('root', [function() {
    
    var one, two;
    var cal; 
    
    return {
        getRoot: function(x) {
            if(x.split("+").length == 2) {
                one = x.split("+")[0]; 
                two = x.split("+")[1];
                cal = parseInt(one) + parseInt(two);  
                         
            } else if (x.split("-").length == 2) {
                
                one = x.split("-")[0]; 
                two = x.split("-")[1];
                cal = parseInt(one) - parseInt(two);     
                     
            } else if (x.split("*").length == 2) {
                
                one = x.split("*")[0]; 
                two = x.split("*")[1];
                cal = parseInt(one) * parseInt(two);   
                        
            } else if (x.split("/").length == 2) {

                one = x.split("/")[0]; 
                two = x.split("/")[1];
                cal = parseInt(one) / parseInt(two);    
                        
            } else {
                cal = x;
            }
             return Math.sqrt(cal).toFixed(2);
      
        }
    }
}]);