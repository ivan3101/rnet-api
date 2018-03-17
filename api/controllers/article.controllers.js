const Article = require('../models/article.model');
const Comment = require('../models/comment.model');

module.exports.getAllArticles = async (req, res) => {
    const quantity = req.query.quantity || 8;
    const page = req.query.page || 1;
    const articles = await Article.find({
        'isActive': true
    })
        .skip((quantity * page) - quantity)
        .limit(+quantity);
    res
        .status(200)
        .json(articles);
};

module.exports.getFeaturedArticles = async (req, res) => {
    const quantity = req.query.quantity || 5;
    const page = req.query.page || 1;
    const articles = await Article.find({
        'featured': true,
        'isActive': true
    })
        .skip((quantity * page) - quantity)
        .limit(+quantity)
        .select('-comments');
    res
        .status(200)
        .json(articles);
};

module.exports.getArticlesByCategory = async (req, res) => {
    const quantity = req.query.quantity || 10;
    const page = req.query.page || 1;
    const category = req.params.category;
    const articles = await Article.find({
        'category': category,
        'isActive': true
    })
        .skip((quantity * page) - quantity)
        .limit(+quantity)
        .select('-comments');

    res
        .status(200)
        .json(articles);
};

module.exports.getArticleById = async (req, res) => {
    const id = req.params.id;
    const article = await Article.findOne({
        '_id': id,
        'isActive': true
    }).populate({
        path: 'comments',
        populate: {
            path: 'author',
            select: 'fullName imageUrl -_id'
        }
    });
    res
        .status(200)
        .json(article);
};

module.exports.addArticle = async (req, res) => {
    const article = new Article(req.body);
    await article.save();
    res
        .status(201)
        .json({
            'statusCode': 201,
            'payload': {
                'statusCode': 201,
                'error': null,
                'message': 'El articulo ha sido creado con exito'
            }
        });
};

module.exports.addComment = async (req, res) => {
    const id = req.params.id;
    const comment = new Comment(req.body);
    await comment.save();
    const article = await Article.findOne({
        '_id': id,
        'isActive': true
    });
    article.comments.push(comment._id);
    await article.save();
    res
        .status(201)
        .json()
};

module.exports.addFeaturedArticle = async (req, res) => {
    const id = req.params.id;
    await Article.update({
        '_id': id,
        'isActive': true
    }, { 'featured': true });
    res
        .status(204)
        .json()
};