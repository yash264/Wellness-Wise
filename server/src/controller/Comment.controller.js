const postModel = require('../models/Post.model.js');
const {commentModel} = require('../models/Comment.Model.js');

async function createComments(req, res){
    try{
        
        const body = req.body;
        const user = req.user;
        const userId = user._id;
        const name = user.name;

        const comment = await commentModel.create({
            name:name,
            userId: userId,
            content:body.content
        });
        const commentId = comment._id;  
        const postid = req.params.id;

        await postModel.findByIdAndUpdate({
            _id: postid
        },
        {
            $push:{
                comment: commentId 
            }
        }
        );

        res.status(201).json({
            success:true,
            msg : "Comment created sucessfully",
            data : comment
        })

    } catch(error){
        res.status(400).json({
            msg : ""+error
        })
    }

}

async function getComments(req, res){
    try{
        const postId = req.params.id;
        const post = await postModel.findOne({ _id: postId})
        .populate({
            path: 'comment',
            model: 'commentModel',
            populate: {
              path: 'replies',
              model: 'commentModel',
            }
        });
        
        var comment = post.comment;
        comment.filter((c) => {
            return (!c.isReply)
        })
       
        
        res.status(201).json(comment);

    } catch(error){
        res.status(400).json({
            msg : ""+error
        })
    }

}

async function postReply(req, res){
    try{
        const { content, parentCommentId } = req.body;
        const user = req.user;
        const userId = user._id;
        const name = user.name;

        const reply = await commentModel.create({
            name: name,
            userId: userId,
            content: content,
            isReply: true,
            parentComment: parentCommentId
        });

        await commentModel.findByIdAndUpdate({
            _id: parentCommentId
        },
        {
            $push:{
                replies: reply._id 
            }
        }
        );
        
        res.status(201).json(reply);

    } catch(err){
        res.status(400).json({
            msg : ""+err
        })
    }
}


module.exports={ createComments, getComments, postReply };

