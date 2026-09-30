import { Fragment } from "react";
type SchematicNoteProps = {
	schX: number;
	schY: number;
	text: string;
	fontSize?: number;
};

// Each native text element has its own bounds and an explicit baseline.
// This also keeps multiline IC notes inside their A4 sheet boundary.
export function SchematicNote(props: SchematicNoteProps) {
	const fontSize = props.fontSize ?? 0.23;
	return (
		<>
			{props.text.split("\n").map((line, index) => (
				<Fragment key={index}>
					<schematictext
						text={line}
						schX={props.schX}
						schY={props.schY - index * fontSize * 1.55}
						fontSize={fontSize}
					/>
				</Fragment>
			))}
		</>
	);
}
