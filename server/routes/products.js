const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        console.log('user routng');
    } catch (error) {
        console.log('')
    }
});

router.post('/post', async(req, res)=>{
    try {
        
    } catch (error) {
        console.log('Error', error.message)
    }
});

module.exports = router;