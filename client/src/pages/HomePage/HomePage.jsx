import React from 'react'
import styles from "./HomePage.module.scss"

const HomePage = () => {
    return (
        <div className={styles.root}>
            <div className={'pageTitle'}>
                Welcome to Library.IO
            </div>
            <div className={styles.content}>
                <p className={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem deserunt dolorum et explicabo
                    facilis inventore itaque iure laborum magni natus neque nesciunt quos, recusandae, sapiente, sed
                    ullam veniam voluptas. Esse?
                </p>
                <p className={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, repudiandae sapiente. Consequuntur debitis, delectus deserunt exercitationem facilis, hic id illum in ipsum necessitatibus neque nostrum quaerat quos tempora temporibus veniam voluptatibus. Alias animi beatae deserunt dolorum facere minus omnis porro provident quibusdam ullam. Adipisci amet excepturi harum iste, porro recusandae?
                </p>
                <p className={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, reiciendis.
                </p>
                <p className={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, facilis ipsam magni minus nobis officiis possimus quas ratione rem tempore? A consectetur consequuntur dolorum esse minima, natus quibusdam reiciendis. Ab amet consequuntur doloremque eligendi est inventore natus nesciunt quas ratione tenetur. Amet aperiam assumenda atque eius hic iste iusto maiores mollitia quidem veritatis? Consequuntur dicta explicabo necessitatibus neque nihil rem sequi voluptates. Aliquam blanditiis cumque deleniti ea perferendis porro sint ullam vero. Aspernatur at consequuntur culpa delectus dicta est hic impedit in inventore iusto laudantium magni minus, nemo non porro quaerat quidem quo repellendus sed sequi sit suscipit voluptas voluptatem?
                </p>
            </div>
        </div>
    )
}

export default HomePage