const products = require('../modal/projectSchema')

exports.addProject = async (req, res) => {
  console.log('inside add request');
  console.log(req.payload);
  const userid = req.payload

  const projectImage = req.file.filename

  const { title, language, github, website, overview } = req.body
  console.log(title, language, github, website, overview);

  try {
    const existingProject = await products.findOne({ github })
    if (existingProject) {
      res.status(406).json('Already Exist')
    } else {
      const newProject = new products({
        title, language, github, website, overview, projectImage, userId: userid
      })
      await newProject.save() //to save the project in mongodb
      res.status(200).json(newProject)
    }

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.getAllProjectController = async (req, res) => {

  const searchkey = req.query.search
  console.log(searchkey);
  try {

    const query = {
      language: {
        // options to remove case sensitivity
        $regex: searchkey, $options: 'i'
      }
    }

    const allProject = await products.find(query)
    res.status(200).json(allProject)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.getProjectController = async (req, res) => {
  try {

    const allProject = await products.find().limit(3)
    res.status(200).json(allProject)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.getUserProject = async (req, res) => {
  const userId = req.payload
  console.log(userId);

  try {

    const allUserProject = await products.find({ userId })
    console.log(allUserProject);
    res.status(200).json(allUserProject)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.deleteProjectController = async (req, res) => {
  console.log(req);

  const { id } = req.params
  try {
    const result = await products.findByIdAndDelete({ _id: id })
    res.status(200).json(result)
  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.updateProjectController = async (req, res) => {

  const { id } = req.params
  const { title, language, github, website, overview, projectImage } = req.body

  const uploadImage = req.file ? req.file.filename : projectImage

  try {
    const existingProject = await products.findByIdAndUpdate({ _id: id }, { title, language, github, website, overview, projectImage: uploadImage }, { new:true })
    await existingProject.save()
    res.status(200).json(existingProject)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}