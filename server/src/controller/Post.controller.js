const postModel = require('../models/Post.model');
const userModel = require('../models/User.model');

async function createPost(req, res){
    try{
        const { caption, imageURL } = req.body;
        const user = req.user;
        const name = user.name;
        const userid = user.id;

        var postData = {
            name,
            caption,
            imageURL,
            userPic: user.pic
        };

        const post = await postModel.create(postData);
        // const postId = new mongoose.Types.ObjectId(post.id);
        const postId = post._id;
        

        await userModel.findByIdAndUpdate({
            _id: userid
        },
        {
            $push:{
                post: postId
            }
        }
        );


        res.status(201).json({
            success:true,
            msg : "Post created sucessfully",
            data : post
        })
    }
    catch(error){

        res.status(400).json({
            msg : ""+error
        })
    }
}

async function getPagePost(req, res){
    const limit = 6;
    const page = parseInt(req.params.page);
    const skip = (page-1)*limit; // how many post needs to be skipped   
    const userId = req.user.id;

    try{
        const posts = await postModel.find({}).skip(skip).limit(limit).sort({ timestamp: -1 }).populate({
            path: "comment",
            options: { sort: { timestamp: -1 } }
        });
        res.status(201).json({
            data: posts,
            userId: userId
        });
    }
    catch(error){
        res.status(500).json({
            msg : "error: "+error
        })
    }
}


// returns all the posts of the user and the total sum of upvotes and downvotes of all posts
async function getUserData(req, res){
    try{
        const userId = req.user.id;
        const user = await userModel.findOne({ _id: userId }).populate("post");
        
        var up=0,down=0;
        for(var i=0;i<user.post.length;i++){
          up+=user.post[i].upvote.length;
          down+=user.post[i].downvote.length;
        }

        res.status(200).json({
            _id: userId,
            pic: user.pic,
            // post:user.post,
            upvote:up,
            downvote:down
        });
     

    } catch(error){
        
        res.status(400).json({
            msg : "error"+error
        })
    }

}

async function fetchUserPosts(req, res){
    try{
        const limit = 6;
        const { page, tab } = req.body;
        const skip = (page-1)*limit;

        const user = req.user;

        if (tab === 0) {
            filter = { name: user.name };
        } else if (tab === 1) {
            filter = { upvote: { $in: [user.id] } };
        } else {
            filter = { downvote: { $in: [user.id] } };
        }


       const posts = await postModel.find(filter).skip(skip).limit(limit).sort({ timestamp: -1 }).populate({
            path: "comment",
                options: { sort: { timestamp: -1 } }
            });
            res.status(201).json({
                data: posts,
                userId: user.id
            });
       

    } catch(error){
        console.log(error);
        res.status(400).json({
            msg : "error"+error
        })
    }
}



async function getAPost(req, res){
    try{
        const postId = req.params.id;

        const post = await postModel.findOne({ _id: postId }).populate("comment");
        

        res.status(201).json({
            success:true,
            data:post
        });
     

    } catch(error){
        
        res.status(400).json({
            msg : "error"+error
        })
    }
}

async function postUpvote(req, res){
    try{
        const user = req.user;
        const userid = user.id;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        let ifUpvoteExists = post.upvote.indexOf(userid);
        let ifDownvoteExists = post.downvote.indexOf(userid);

        if(ifUpvoteExists != -1){
            // remove upvote
            post.upvote.splice(ifUpvoteExists, 1);
            ifUpvoteExists = -1;
        }
        else{
            if(ifDownvoteExists != -1){
                // remove downvote
                post.downvote.splice(ifDownvoteExists, 1);
                ifDownvoteExists = -1;
            }
            // add upvote
            post.upvote.push(userid);
            ifUpvoteExists = post.upvote.length - 1;
        }

        ifUpvoteExists = post.upvote.indexOf(userid);
        ifDownvoteExists = post.downvote.indexOf(userid);
        const result=await postModel.findByIdAndUpdate({_id:postid},
            { 
                upvote:post.upvote,
                downvote:post.downvote
            },
            {
                new: true
            }
            );
            

        res.status(201).json({
            success:true,
            msg: "Upvoted successfully",
            isUpvoted: ifUpvoteExists,
            isDownvoted: ifDownvoteExists,
            data: result
        })


    } catch(error){

        res.status(400).json({
            msg : "error"+error
        })
    }
}

async function postDownvote(req, res){
    try{
        const user = req.user;
        const userid = user.id;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        let ifDownvoteExists = post.downvote.indexOf(userid);
        let ifUpvoteExists = post.upvote.indexOf(userid);

        if(ifDownvoteExists != -1){
            // remove downvote
            post.downvote.splice(ifDownvoteExists, 1);
            ifDownvoteExists = -1;
        }
        else{
            if(ifUpvoteExists != -1){
                // remove upvote
                post.upvote.splice(ifUpvoteExists, 1);
                ifUpvoteExists = -1;
            }
            // add downvote
            post.downvote.push(userid);
            ifDownvoteExists = post.downvote.length - 1;
        }

        ifUpvoteExists = post.upvote.indexOf(userid);
        ifDownvoteExists = post.downvote.indexOf(userid);
        const result=await postModel.findByIdAndUpdate({_id:postid},
            { 
                upvote:post.upvote,
                downvote:post.downvote
            },
            {
                new: true
            }
            );
        

        res.status(201).json({
            success:true,
            msg: "Downvoted successfully",
            isUpvoted: ifUpvoteExists,
            isDownvoted: ifDownvoteExists,
            data: result
        })


    } catch(error){

        res.status(400).json({
            msg : "error"+error
        })
    }
}

async function getUpDownVote(req, res){
    try{

        const postid = req.params.id;
        const post = await postModel.findOne({ _id: postid })
        .populate({path:'upvote', model: 'userModel'})
        .populate({path:"downvote", model: "userModel"});

        res.json({
            status: 201,
            msg: "post details",
            postid: postid,
            upvote: post.upvote.length,
            downvote: post.downvote.length
        });

    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}

async function deletePost(req, res){
    try{
        const postId = req.params.id;
        const user = req.user;
        const userName = user.name;

        await userModel.findOneAndUpdate({ name: userName },{
            $pull: { post: postId }
        });

        await postModel.deleteOne({ _id: postId });
        res.json({
            status: 200,
            msg: "Successfully deleted"
        })
    } catch(error){

        res.json({
            msg : "error"+error
        })
    }
}


module.exports = { getPagePost, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, deletePost};