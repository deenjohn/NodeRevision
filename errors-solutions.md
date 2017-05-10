
# 1) use slash before route path :

### wrong :
app.post('api/drivers' , DriverController.create);
this will not be able to reach

### correct :
app.post('/api/drivers' , DriverController.create);
