import { body, validationResult } from "express-validator";

export const ValidateRequest = async (req, res, next) => {

    // 1. Setup the rules for validation

    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({ gt: 0 }).withMessage("The price should be positive value"),
        body('imageUrl').custom((value, {req})=>{
            if(!req.file){
                throw new Error("Image is required");
            }
            return true;
        })
    ];

    // 2. Run those rules

    await Promise.all(rules.map(rule => rule.run(req)))

    // 3. Check if there is any errors

    var validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.render("new-product", {
            errorMessage: validationErrors.array()[0].msg
        });
    }

    next();

}