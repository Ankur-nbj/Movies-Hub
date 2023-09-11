import { Badge } from "@mui/material"
import { img_300, unavailable } from "../../Config/Config"
import "./SingleContent.css"
import ContentModal from "../ContentModal/ContentModal";
import ContentManager from "../ContentModal/ContentManager"

const SingleContent = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) => {
	return (
		<ContentManager media_type={media_type} id={id}>
			<Badge
				badgeContent={vote_average}
				color={vote_average > 6 ? "primary" : "secondary"}
			/>
			<img
				className="poster"
				src={poster ? `${img_300}${poster}` : unavailable}
				alt={title}
			/>
			<b className="title">{title}</b>
			<span className="subTitle">
				<b>{media_type === "tv" ? "TV Series" : "Movie"}</b>
				<span className="subTitle"><b>{date}</b></span>
			</span>
		</ContentManager>
	)
}

export default SingleContent
