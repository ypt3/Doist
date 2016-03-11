var myApp = angular.module('myApp', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/todos').success(function(data){
    $scope.todos = data;
    console.log(data);
  })
  .error(function(data){
    console.log('Error:' + data);
  });

  // when submitting the add form, send the text to the node api
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData).success(function(data){
      $scope.formData = {}; //clear the form so our user is ready to enter another
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: '+ data);
    });
  };

  //delete a todo task
  $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
