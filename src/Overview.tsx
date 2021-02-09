import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Container,
    createStyles,
    IconButton,
    makeStyles,
    Theme
} from "@material-ui/core";
import React from "react";
import { useListingsContext } from "./ListingsContext";
import { OverviewTable } from "./OverviewTable";
import { OverviewTreemap } from "./OverviewTreemap";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import { useResizeObserver }  from './utils/index';


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button : {
        padding: 0
    },
}));

export const Overview = () => {
    const [ loaded, setLoaded ] = React.useState(false);
    const { listings } = useListingsContext()!;
    const data = React.useRef<any>();
    const componentRef = React.useRef(null);
    const { width, height } = useResizeObserver(componentRef);
    const classes = useStyles();
    const [ expanded, setExpanded ] = React.useState(true);

    const treemapData = React.useCallback(() => {
        setLoaded(false);
        let listingsData = listings.map(listing => ({
            category: 'Market Cap',
            name: listing.symbol,
            value: listing.quote.USD.market_cap,
        }));

        data.current = {
            name: 'Market Cap Treemap',
            children: listingsData
        };
        setLoaded(true);            
    }, [listings]);

    React.useEffect(() => {
        if (listings.length > 0) {
            treemapData();
        }
    }, [listings, treemapData]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container maxWidth="lg" disableGutters>
            <Card className={classes.root}>
                <CardHeader
                 title="Market Cap Breakdown"
                 action={
                    <IconButton
                     className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      }, classes.button)}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show graph"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                 }
                 titleTypographyProps={{
                    variant: 'h6'
                 }}
                />
                <Collapse className={classes.root} in={expanded} timeout="auto">
                    <CardContent className={classes.root}>
                        <div
                         style={{ height: '300px', width: '100%' }}
                         ref={componentRef}>
                            {loaded && 
                                <OverviewTreemap
                                data={data.current}
                                height={height}
                                width={width}
                                key={listings[0].quote.USD.market_cap}
                                />
                            }
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
            
            <OverviewTable
             headers={[
                "Rank",
                "Name",
                "Price (USD)",
                "Market Cap",
                "Volume 24hr",
                "1hr",
                "24hr"
             ]}
            />

        </Container>
    );
};